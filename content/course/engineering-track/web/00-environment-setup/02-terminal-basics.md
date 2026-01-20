# Terminal Basics

> **Quick Summary:** Master the essential terminal commands you'll use daily as a design engineer. We'll cover navigation, file management, and useful shortcuts that will make you efficient in the command line.

## What You'll Learn

During this module, you will learn the essential navigation commands required for daily development and examine the processes for creating, moving, and deleting files and folders. We'll explore how to read and search file contents efficiently and walk through the keyboard shortcuts and help systems that will save you time and assist you whenever you're stuck.

## The Commands You'll Actually Use

Out of hundreds of possible commands, you'll use about 15-20 regularly. Let's focus on those.

## Navigation Commands

### `pwd` - Where Am I?

Print Working Directory. Shows your current location.

```bash
pwd
```

Output: `/Users/karl/Documents/projects`

Think of it as the breadcrumb trail in Finder.

### `ls` - What's Here?

Lists the contents of the current folder.

```bash
ls
```

Output:

```text
Desktop  Documents  Downloads  Pictures
```

To modify how the `ls` command functions, you can append various flags that start with a hyphen. For example, using `ls -l` will display a detailed list including file sizes and modification dates, while `ls -a` reveals all files, including hidden ones that begin with a full stop. You can also combine these flags into a single command, such as `ls -la`, to see a comprehensive and detailed view of everything within your current directory.

### `cd` - Move Around

Change Directory. Navigate to different folders.

```bash
cd Documents
```

Moves into the Documents folder.

To navigate quickly, you can use several shorthand symbols with the `cd` command. Typing `cd ~` will always return you to your home folder, while `cd ..` moves you up one level to the parent directory. For traversing larger distances, you can use `cd ../..` to go up two levels, or `cd -` to instantly return to the previous folder you were in. Finally, `cd /` will take you directly to the root of your entire file system.

#### Tab Completion

Start typing a folder name and press **Tab**. The terminal will autocomplete it:

```bash
cd Doc[TAB]
```

Becomes:

```bash
cd Documents/
```

This is one of the most useful features. Use it constantly.

### `clear` - Clean Up

Clears the terminal screen. Useful when things get cluttered.

```bash
clear
```

Or just press **⌘ + K** (Mac) or **Ctrl + L** (Windows/Linux).

## File and Folder Commands

### `mkdir` - Create Folders

Make Directory. Creates a new folder.

```bash
mkdir my-project
```

Create nested folders in one command:

```bash
mkdir -p projects/web/my-site
```

The `-p` flag creates parent directories as needed.

### `touch` - Create Files

Creates an empty file, or updates the timestamp of an existing file.

```bash
touch index.html
```

Create multiple files at once:

```bash
touch index.html styles.css script.js
```

### `cp` - Copy

Copy files or folders.

```bash
cp original.txt copy.txt
```

Copy a folder (use `-r` for recursive):

```bash
cp -r my-folder my-folder-backup
```

### `mv` - Move and Rename

Move files to a new location:

```bash
mv file.txt Documents/
```

Rename a file (move it to a new name):

```bash
mv old-name.txt new-name.txt
```

To manage your files, use `rm unwanted-file.txt` to delete specific files or `rm -r unwanted-folder` to recursively remove a directory and all of its contents. Be extremely careful when using these commands, as the terminal does not move items to the Trash; instead, they are permanently deleted from your system immediately.

### `rmdir` - Delete Empty Folders

Safer than `rm -r` for removing folders. Only works if the folder is empty.

```bash
rmdir empty-folder
```

## Reading Files

### `cat` - Display Contents

Concatenate. Shows the entire contents of a file.

```bash
cat package.json
```

Good for short files. For long files, use:

### `less` - Browse Contents

Opens a file for browsing. You can scroll up and down.

```bash
less long-file.txt
```

Press `q` to quit, `/` to search.

When you only need to see parts of a file, use the `head -20 file.txt` command to view the first twenty lines, or `tail -20 file.txt` to see the final twenty lines. These tools are particularly useful for quickly checking the beginning of a script or the most recent entries in a log file without opening the entire document.

## Finding Things

### `find` - Locate Files

Find files by name:

```bash
find . -name "*.css"
```

Finds all CSS files in the current folder and subfolders.

### `grep` - Search Inside Files

Search for text within files:

```bash
grep "background-colour" styles.css
```

Search recursively in all files:

```bash
grep -r "TODO" .
```

Finds every occurrence of "TODO" in the current folder.

## Getting Help

### `man` - Manual Pages

Read the manual for any command:

```bash
man ls
```

Press `q` to exit.

You can also use the `--help` flag with most commands, such as `ls --help`, to get a quick overview of available options. For an even more accessible experience, consider installing `tldr`, which provides simplified help pages like `tldr ls` that focus on practical, real-world examples rather than dense technical documentation.

## Keyboard Shortcuts

These will save you hours:

| Shortcut     | Action                         |
| ------------ | ------------------------------ |
| **Tab**      | Autocomplete file/folder names |
| **↑ / ↓**    | Browse previous commands       |
| **Ctrl + C** | Cancel current command         |
| **Ctrl + A** | Jump to start of line          |
| **Ctrl + E** | Jump to end of line            |
| **Ctrl + U** | Clear the current line         |
| **Ctrl + R** | Search command history         |
| **Ctrl + L** | Clear screen                   |

### Command History

Press the **up arrow** to cycle through previous commands. This is incredibly useful when you need to run similar commands repeatedly.

Search your history with:

```bash
history | grep "npm"
```

Shows all previous commands containing "npm".

## Practical Patterns

### Running Multiple Commands

Run commands in sequence with `&&`:

```bash
mkdir my-project && cd my-project
```

The second command only runs if the first succeeds.

### Using the Output of Commands

Use `|` (pipe) to send output to another command:

```bash
ls -la | grep ".css"
```

Lists all files, then filters to show only CSS files.

### Redirecting Output

Save output to a file with `>`:

```bash
ls -la > file-list.txt
```

Append to a file with `>>`:

```bash
echo "New line" >> notes.txt
```

## Try It Yourself

### Exercise 1: Project Setup

Create a typical web project structure using only the terminal:

```bash
# Start on your Desktop
cd ~/Desktop

# Create project folder
mkdir my-website

# Enter the folder
cd my-website

# Create standard structure
mkdir css js images

# Create initial files
touch index.html css/styles.css js/main.js

# Verify structure
ls -la
ls css
ls js
```

### Exercise 2: Navigation Challenge

1. Navigate to your home folder
2. Go to Documents
3. Go back to home using `cd -`
4. Navigate to Downloads using an absolute path (starting with `/` or `~`)
5. Return home using `~`

### Exercise 3: Finding Files

Navigate to any project folder and:

1. Find all JavaScript files: `find . -name "*.js"`
2. Search for the word "function" in all files: `grep -r "function" .`
3. List files modified in the last day: `find . -mtime -1`

## Common Mistakes (And How to Avoid Them)

### Spaces in Names

This won't work:

```bash
cd My Documents
```

The terminal thinks "My" and "Documents" are separate arguments. Use quotes or escape the space:

```bash
cd "My Documents"
# or
cd My\ Documents
```

**Tip:** Avoid spaces in folder/file names for projects. Use hyphens or underscores: `my-documents`.

### Case Sensitivity

On Mac/Linux, `Documents` and `documents` are different folders. Windows is case-insensitive.

### Forgetting Where You Are

Always check your location with `pwd` if you're unsure. Running commands in the wrong folder is a common source of confusion.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "terminal-basics-quiz",
  "type": "multiple-choice",
  "title": "Terminal Commands",
  "description": "Test your understanding of essential terminal commands.",
  "difficulty": "easy",
  "question": "What command would you use to create a new folder called 'components' inside a 'src' folder that doesn't exist yet?",
  "options": [
    {
      "id": "a",
      "text": "mkdir src/components",
      "isCorrect": false,
      "explanation": "This would fail if 'src' doesn't exist. You need the -p flag."
    },
    {
      "id": "b",
      "text": "mkdir -p src/components",
      "isCorrect": true,
      "explanation": "Correct! The -p flag creates parent directories as needed, so both 'src' and 'components' are created."
    },
    {
      "id": "c",
      "text": "touch src/components",
      "isCorrect": false,
      "explanation": "touch creates files, not folders."
    },
    {
      "id": "d",
      "text": "cd src/components",
      "isCorrect": false,
      "explanation": "cd changes directory but doesn't create folders."
    }
  ]
}
-->

## Key Takeaways

To become proficient in the terminal, you must master the fundamental navigation commands like `pwd`, `ls`, and `cd`, while also becoming comfortable with file management tools such as `mkdir`, `cp`, and `rm`. Use `find` and `grep` to locate content quickly, and always lean on Tab completion as your primary time-saving mechanism. By consistently checking your location with `pwd` and leveraging viewing tools like `cat` and `less`, you will build the confidence needed to navigate complex project structures with ease.

## Next Steps

Continue to [Installing Tools](./03-installing-tools.md) →
