# Project Instructions

## User Collaboration Preferences

- Do not ask for routine confirmation before making code changes.
- Execute straightforward implementation requests directly.
- Ask only when:
  - the environment requires an explicit approval for an escalated command,
  - there is a genuinely ambiguous decision with materially different outcomes,
  - the action could overwrite or conflict with user-authored work in a risky way.

## Escalation Minimization

- Prefer solutions that stay inside the writable workspace and sandbox.
- Avoid running commands that trigger approval unless they are necessary to complete the task.
- If verification can be done without an escalated command, prefer that route.
- When an escalated command is necessary, keep the approval request short and specific.

## Working Style

- Be direct and concise.
- Do the work first; explain briefly after.
- Treat the repository as the source of truth for ongoing chat behavior in this project.

## Showcase Fidelity

- Components shown in the showcase must render the same real component implementation used in the product.
- Any visual/layout/content change inside an organism or component must be made in the component itself so it appears both in the product and in the showcase.
- Showcase-specific CSS must not change the internal appearance, spacing, background, content, or layout of a component.
- The only allowed showcase-only visual addition is an external preview treatment around the component, such as a soft shadow on the organism preview surface.
