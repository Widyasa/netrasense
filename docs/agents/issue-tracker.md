# Issue tracker: GitHub

Issues and specs for this repo live as GitHub issues in `Widyasa/netrasense`. Use the `gh` CLI for all operations.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body "..."`. Use a heredoc for multi-line bodies.
- **Read an issue**: `gh issue view <number> --comments`, filtering comments by `jq` and also fetching labels.
- **List issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters.
- **Comment on an issue**: `gh issue comment <number> --body "..."`
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Close**: `gh issue close <number> --comment "..."`

Infer the repo from `git remote -v`; `gh` does this automatically when run inside a clone.

## Area labels

In addition to the triage state labels, engineering-area labels are used for NetraSense tickets:

- `fe` — front-end / mobile UI
- `be` — back-end / API / indexer
- `ai` — AI / CV / perception / audio
- `web3` — smart contracts / wallet / dApp

Apply the area label(s) that best describe the work. A ticket may have more than one area label if it crosses boundaries.

## Pull requests as a triage surface

**PRs as a request surface: no.**
