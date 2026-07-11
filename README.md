# 4-Agent Dev Pipeline (Planner → Coder → Tester → Reviewer)

## Setup
1. Copy `.claude/` and `.pipeline/` into the root of your project (the one Claude Code runs in).
2. Make sure `.pipeline/` is empty before each new feature run (or let `/ship` clean it — see note below).
3. Commit `.claude/` to your repo so the team shares the same pipeline. `.pipeline/` can be gitignored.

## Usage
Open a branch for the feature, then in Claude Code run:

    /ship add rate limiting to the login endpoint, max 5 attempts per minute per IP, return 429 after limit

The command chains all four subagents automatically:
- **planner** (opus) writes `.pipeline/spec.md`
- **coder** (sonnet) implements it, writes `.pipeline/changes.md`
- **tester** (sonnet) writes/runs tests, writes `.pipeline/test-results.md`
- **reviewer** (opus, read-only) writes `.pipeline/review.md` with a SHIP / NEEDS WORK / BLOCK verdict

Nothing gets merged automatically — the pipeline stops and leaves the branch for you to review in the morning.

## Notes
- Write specific feature requests. Vague requests produce vague specs.
- Start with small, bounded features (one endpoint, one page, one module) before trusting it on bigger ones.
- Clear `.pipeline/*` before each new run so agents don't read stale handoff files from the last feature. You can add this as step 0 in `ship.md`:
  `rm -rf .pipeline/* at the start of the command.`
- For running multiple features in parallel, use a separate git worktree per feature so agents don't collide on the same files.
