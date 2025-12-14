from __future__ import annotations

import argparse
import os
import subprocess
import sys
from pathlib import Path
from typing import Iterable


REPO_ROOT = Path(__file__).resolve().parent


EXCLUDE_DIR_NAMES = {
    ".venv",
    "node_modules",
    ".ruff_cache",
    ".git",
    "dist",
    "build",
}


def _iter_example_files(root: Path) -> Iterable[Path]:
    for path in root.rglob("*"):
        if not path.is_file():
            continue
        if path.suffix not in {".py", ".js"}:
            continue
        if any(part in EXCLUDE_DIR_NAMES for part in path.parts):
            continue
        yield path


def _format_rel(path: Path) -> str:
    return path.relative_to(REPO_ROOT).as_posix()


def _find_venv_python() -> str | None:
    candidates = [
        REPO_ROOT / ".venv" / "Scripts" / "python.exe",  # Windows
        REPO_ROOT / ".venv" / "bin" / "python",  # *nix
    ]
    for candidate in candidates:
        if candidate.exists():
            return str(candidate)
    return None


def _resolve_target(target: str, files: list[Path]) -> Path:
    # 1) If it's an integer, treat as 1-based index from `list`.
    try:
        index = int(target)
        if 1 <= index <= len(files):
            return files[index - 1]
    except ValueError:
        pass

    # 2) Treat as a relative/absolute path.
    candidate = Path(target)
    if not candidate.is_absolute():
        candidate = (REPO_ROOT / candidate).resolve()

    if candidate.exists() and candidate.is_file():
        if candidate.suffix not in {".py", ".js"}:
            raise SystemExit("Only .py and .js files are supported")
        return candidate

    # 3) Fallback: substring match against relative path.
    needle = target.lower()
    matches = [p for p in files if needle in _format_rel(p).lower()]
    if len(matches) == 1:
        return matches[0]

    if len(matches) == 0:
        raise SystemExit(
            "Not found. Provide a path, a list index, or a substring of the file path."
        )

    print("Multiple matches; be more specific or use a path/index:")
    for i, path in enumerate(matches[:25], start=1):
        print(f"{i:4d}  {_format_rel(path)}")
    if len(matches) > 25:
        print(f"... and {len(matches) - 25} more")
    raise SystemExit(2)


def cmd_list(args: argparse.Namespace) -> int:
    files = sorted(_iter_example_files(REPO_ROOT))

    if args.lang != "all":
        suffix = ".py" if args.lang == "py" else ".js"
        files = [p for p in files if p.suffix == suffix]

    if args.contains:
        needle = args.contains.lower()
        files = [p for p in files if needle in _format_rel(p).lower()]

    if args.limit is not None:
        files = files[: args.limit]

    for i, path in enumerate(files, start=1):
        print(f"{i:4d}  {_format_rel(path)}")

    return 0


def cmd_run(args: argparse.Namespace) -> int:
    files = sorted(_iter_example_files(REPO_ROOT))
    if args.lang != "all":
        suffix = ".py" if args.lang == "py" else ".js"
        files = [p for p in files if p.suffix == suffix]
    target_path = _resolve_target(args.target, files)

    if target_path.suffix == ".py":
        python = _find_venv_python() or sys.executable or "python"
        cmd = [python, str(target_path)]
    else:
        cmd = ["node", str(target_path)]

    cmd.extend(args.args)

    env = os.environ.copy()
    env.setdefault("PYTHONUTF8", "1")

    return subprocess.call(cmd, cwd=str(REPO_ROOT), env=env)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="run.py",
        description="List and run example scripts in this repo (.py/.js).",
    )

    subparsers = parser.add_subparsers(dest="command", required=True)

    p_list = subparsers.add_parser("list", help="List available examples")
    p_list.add_argument(
        "--lang",
        choices=["all", "py", "js"],
        default="all",
        help="Filter by language",
    )
    p_list.add_argument(
        "--contains",
        default=None,
        help="Case-insensitive substring filter on the relative path",
    )
    p_list.add_argument(
        "--limit",
        type=int,
        default=None,
        help="Limit number of results",
    )
    p_list.set_defaults(func=cmd_list)

    p_run = subparsers.add_parser("run", help="Run an example")
    p_run.add_argument(
        "--lang",
        choices=["all", "py", "js"],
        default="all",
        help="Filter the searchable set when using an index or substring",
    )
    p_run.add_argument(
        "target",
        help="Relative path, list index, or a substring of the relative path",
    )
    p_run.add_argument(
        "args",
        nargs="*",
        help="Arguments passed through to the example (use -- before args that start with -)",
    )
    p_run.set_defaults(func=cmd_run)

    return parser


def main(argv: list[str]) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    return int(args.func(args))


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
