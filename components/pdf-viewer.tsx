/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

interface PDFViewerProps {
  url: string;
  downloadName?: string;
}

type ColorMode = "auto" | "on" | "off";

export function PDFViewer({ url, downloadName = "resume.pdf" }: PDFViewerProps) {
  const [pdf, setPdf] = useState<any>(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [systemIsDark, setSystemIsDark] = useState(false);
  const [colorMode, setColorMode] = useState<ColorMode>("auto");
  const [renderError, setRenderError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const renderTaskRef = useRef<any>(null);

  // 1. Listen to HTML [data-theme] updates to auto-sync dark mode
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      setSystemIsDark(isDark);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // 2. Load the PDF.js script dynamically
  useEffect(() => {
    let active = true;
    const scriptId = "pdfjs-script";

    const initPDF = async () => {
      const pdfjs = (window as any).pdfjsLib;
      if (!pdfjs) return;

      // Set worker source using dynamic and resilient cdnjs path
      pdfjs.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

      try {
        const loadingTask = pdfjs.getDocument(url);
        const loadedPdf = await loadingTask.promise;
        if (!active) return;
        setPdf(loadedPdf);
        setNumPages(loadedPdf.numPages);
        setLoading(false);
      } catch (err: any) {
        console.error("Error loading PDF:", err);
        if (active) {
          setRenderError("Failed to parse the PDF document.");
          setLoading(false);
        }
      }
    };

    const script = document.getElementById(scriptId);
    if (!script && !(window as any).pdfjsLib) {
      const newScript = document.createElement("script");
      newScript.id = scriptId;
      newScript.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      newScript.async = true;
      newScript.onload = () => {
        if (active) initPDF();
      };
      newScript.onerror = () => {
        if (active) {
          setRenderError("Failed to load the PDF engine.");
          setLoading(false);
        }
      };
      document.body.appendChild(newScript);
    } else if ((window as any).pdfjsLib) {
      initPDF();
    } else {
      // Script is currently loading
      const checkLoaded = setInterval(() => {
        if ((window as any).pdfjsLib) {
          clearInterval(checkLoaded);
          if (active) initPDF();
        }
      }, 50);
      return () => {
        clearInterval(checkLoaded);
        active = false;
      };
    }

    return () => {
      active = false;
    };
  }, [url]);

  // 3. Render the specific page on scale/pdf changes
  const renderPage = useCallback(async () => {
    if (!pdf) return;

    try {
      // Cancel previous rendering if still executing
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }

      const page = await pdf.getPage(pageNum);
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d", { alpha: false });
      if (!context) return;

      // Responsive calculations based on parent container width
      const containerWidth = containerRef.current ? containerRef.current.clientWidth : 800;
      const defaultViewport = page.getViewport({ scale: 1.0 });

      // Calculate width-fitting scale factor, and apply manual scale modifier
      const baseScale = containerWidth / defaultViewport.width;
      const calculatedScale = baseScale * scale;
      const viewport = page.getViewport({ scale: calculatedScale });

      // Crisp rendering support for Retina/High-DPI screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = viewport.width * dpr;
      canvas.height = viewport.height * dpr;
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;

      context.resetTransform();
      context.scale(dpr, dpr);

      // Render context options
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      const renderTask = page.render(renderContext);
      renderTaskRef.current = renderTask;

      await renderTask.promise;
    } catch (err: any) {
      if (err.name === "RenderingCancelledException" || err.message?.includes("cancelled")) {
        // Safe to ignore rendering cancellations from page rapid flips
        return;
      }
      console.error("Rendering error:", err);
    }
  }, [pdf, pageNum, scale]);

  // Render on page change, scale change, or PDF load
  useEffect(() => {
    renderPage();
  }, [renderPage]);

  // Re-render when the viewport resizes to maintain responsiveness
  useEffect(() => {
    if (!pdf) return;

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        renderPage();
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [pdf, renderPage]);

  // 4. Keyboard controls
  useEffect(() => {
    if (!pdf || loading) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          setPageNum((prev) => Math.max(prev - 1, 1));
          break;
        case "ArrowRight":
          e.preventDefault();
          setPageNum((prev) => Math.min(prev + 1, numPages));
          break;
        case "=":
        case "+":
          e.preventDefault();
          setScale((prev) => Math.min(prev + 0.15, 2.5));
          break;
        case "-":
        case "_":
          e.preventDefault();
          setScale((prev) => Math.max(prev - 0.15, 0.5));
          break;
        case "0":
          e.preventDefault();
          setScale(1.0);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pdf, numPages, loading]);

  // Pad numbers with leading zeroes for a clean monospace tabular style (e.g. 01 / 02)
  const formatPageNum = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  // Cycle color inversion mode
  const cycleColorMode = () => {
    setColorMode((prev) => {
      if (prev === "auto") return "on";
      if (prev === "on") return "off";
      return "auto";
    });
  };

  // Determine whether to apply the inversion filter
  const isInverted = colorMode === "on" || (colorMode === "auto" && systemIsDark);

  return (
    <div className="flex flex-col w-full text-(--color-ink) font-mono" ref={containerRef}>
      {/* MONOSPACE CONTROLS TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-(--color-rule) label-mono select-none">
        {/* Navigation Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPageNum((p) => Math.max(p - 1, 1))}
            disabled={pageNum <= 1 || loading}
            className="link-underline lowercase tracking-[0.06em] disabled:opacity-30 disabled:no-underline disabled:cursor-not-allowed"
          >
            [prev]
          </button>
          
          <span className="font-mono text-[10px] tracking-widest text-(--color-ink-soft) px-1">
            PAGE {formatPageNum(pageNum)} / {formatPageNum(numPages || 1)}
          </span>

          <button
            onClick={() => setPageNum((p) => Math.min(p + 1, numPages))}
            disabled={pageNum >= numPages || loading}
            className="link-underline lowercase tracking-[0.06em] disabled:opacity-30 disabled:no-underline disabled:cursor-not-allowed"
          >
            [next]
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setScale((s) => Math.max(s - 0.15, 0.5))}
            disabled={loading}
            className="link-underline lowercase tracking-[0.06em] disabled:opacity-30 disabled:no-underline"
          >
            [zoom -]
          </button>
          
          <button
            onClick={() => setScale(1.0)}
            disabled={loading}
            className="font-mono text-[10px] text-(--color-ink-soft) hover:text-(--color-accent) transition-colors"
          >
            {Math.round(scale * 100)}%
          </button>

          <button
            onClick={() => setScale((s) => Math.min(s + 0.15, 2.5))}
            disabled={loading}
            className="link-underline lowercase tracking-[0.06em] disabled:opacity-30 disabled:no-underline"
          >
            [zoom +]
          </button>
        </div>

        {/* Color Inversion & Download */}
        <div className="flex items-center gap-4">
          <button
            onClick={cycleColorMode}
            disabled={loading}
            className="link-underline lowercase tracking-[0.06em] text-left min-w-[120px]"
            title="Cycles between mirroring site theme, forced inversion, or no inversion."
          >
            [invert: {colorMode}]
          </button>

          <a
            href={url}
            download={downloadName}
            className="link-underline lowercase tracking-[0.06em]"
          >
            [download]
          </a>
        </div>
      </div>

      {/* DOCUMENT PREVIEW WORKSPACE */}
      <div className="relative flex justify-center w-full min-h-[500px] py-6 select-none bg-(--color-paper)">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-(--color-paper) z-10">
            <div className="label-mono animate-pulse tracking-widest text-(--color-ink-soft)">
              loading document...
            </div>
          </div>
        )}

        {renderError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 bg-(--color-paper)">
            <p className="text-(--color-ink-soft) text-sm mb-4">{renderError}</p>
            <a href={url} className="link-underline label-mono lowercase">
              [open document directly]
            </a>
          </div>
        )}

        {/* THE MAIN PDF CANVAS */}
        <div className="w-full flex justify-center overflow-x-auto">
          <canvas
            ref={canvasRef}
            className="border border-(--color-rule) bg-white transition-[filter] duration-200"
            style={{
              display: loading || renderError ? "none" : "block",
              filter: isInverted
                ? "invert(0.92) hue-rotate(180deg) contrast(1.15) brightness(1.05)"
                : "none",
            }}
          />
        </div>
      </div>

      {/* FOOTER SHORTCUTS */}
      <div className="flex justify-between py-2 border-t border-(--color-rule) text-[10px] text-(--color-ink-soft) tracking-wider uppercase select-none">
        <span>← / → for pages</span>
        <span>+ / - for zoom</span>
      </div>
    </div>
  );
}
