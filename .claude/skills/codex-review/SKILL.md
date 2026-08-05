---
name: codex-review
description: Run a single-pass external code review of this repo with the Codex CLI, then verify the findings before reporting. Use when the user asks for a Codex review, an external review, or a second opinion on the current code.
---

# Codex review

An outside reviewer over the current source. Codex has no context on this repo's
deliberate decisions, so its output is a list of *candidates*, never conclusions.

## Invocation

Check the CLI first — `which codex` and `codex login status`. If it's missing or not
logged in, say so and stop; don't install or authenticate anything.

Then review the **current files**, not the diff:

```bash
codex exec - <<'EOF'
<prompt: file list + focus + constraints>
EOF
```

Run it with `run_in_background: true`. A full pass takes well over ten minutes and will
otherwise hit the Bash timeout.

### Two traps worth remembering

- `codex review --uncommitted "<prompt>"` **fails** — `--uncommitted` and a custom
  prompt are mutually exclusive. It's `--uncommitted` alone, or a prompt alone.
- Diff-based review is the wrong mode here. This repo's working tree is one enormous
  uncommitted rewrite (~4k insertions against ~6.5k deletions of an unrelated older
  site), so a diff review burns its whole budget on deletions that no longer exist.
  Name the files to read explicitly instead.

## Constraints to paste into the prompt

Without these it will suggest things this project has already rejected:

- No tests, linters, formatters, CI or other tooling. The owner does not want them.
- No new npm dependencies.
- No new abstractions, config options, env vars or design patterns. The goal is
  **less** code, not better-organised more code.
- Nothing that changes the rendered visual design. `src/` is a faithful port of an
  external Claude Design file; visual fidelity is a hard requirement.
- Tell it to read `README.md` first and treat everything explained there as
  intentional — it records the non-obvious calls (Tailwind layer collisions, the
  deliberately redundant preloader timers, `setTimeout` over `gsap.delayedCall`, the
  canvas-pixel accent read, `data-rv-fade`).

## Where to aim it

Redundancy and dead code are cheap to find locally. Point Codex at what a local pass
misses: correctness bugs, CSS cascade and `@layer` collisions, leaked listeners or
`requestAnimationFrame` loops, accessibility defects, and breakage on resize or repeat
visits.

## Reporting

**Verify every finding against the actual file before repeating it.** Codex will flag
intentional choices and will sometimes simply be wrong. Report only what survives, most
severe first, and state which findings you rejected and why. Never relay raw output as
though it were established fact.
