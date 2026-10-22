# Workspace Instructions & Active Plugins

This repository is configured with three core developer plugins:

## 1. Get Shit Done (GSD)
- **Philosophy**: Spec-driven development, goal-backward verification, and anti-hallucination execution.
- **Workflow**:
  - Map codebase architecture before complex changes.
  - Plan in atomic phases with explicit tasks and dependencies.
  - Execute with rigorous verification before marking items done.
- **Available Workflows & Slash Commands**:
  - `/map` - Analyze codebase architecture and conventions.
  - `/plan` - Break a feature or milestone into atomic tasks.
  - `/execute` - Execute planned tasks in structured waves.
  - `/verify` - Empirically validate code changes and tests.
  - `/debug` - Systematic root-cause debugging.

## 2. Ponytail
- **Philosophy**: Minimal, simplest solutions that actually work.
- **Rules**:
  - Question speculative complexity and premature abstractions (YAGNI).
  - Reach for the standard library, platform APIs, and existing utilities first.
  - Prefer 1 clear line over 50 lines of boilerplate.
- **Commands & Skills**:
  - `ponytail` - Apply minimal, concise implementation.
  - `ponytail-review` - Hunt down over-engineering and bloated dependencies.
  - `ponytail-audit` - Full codebase audit for unnecessary complexity.

## 3. CodeRabbit
- **Philosophy**: High-rigor automated code reviews and review comment remediation.
- **Commands & Skills**:
  - `code-review` - Thorough review of uncommitted or committed changes before merges.
  - `autofix` - Safely evaluate and apply review feedback.
