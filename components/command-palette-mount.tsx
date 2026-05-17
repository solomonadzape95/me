import { CommandPalette } from "./command-palette";
import { getAllProjects } from "@/lib/projects";

/**
 * Server wrapper for the command palette so we can fetch the project list
 * once at render time and hand a static slug+name array to the client.
 */
export const CommandPaletteMount = async () => {
  const projects = await getAllProjects();
  const slugs = projects.map((p) => ({ slug: p.slug, name: p.name }));
  return <CommandPalette projects={slugs} />;
};
