# Terminal Basics

> **Quick Summary:** Master the essential terminal commands you'll use daily as a design engineer. We'll cover navigation, file management, and useful shortcuts that will make you efficient in the command line.

## What You'll Learn

- Essential navigation commands
- Creating, moving, and deleting files and folders
- Reading and searching file contents
- Keyboard shortcuts that save time
- How to get help when you're stuck

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
```
Desktop    Documents  Downloads  Pictures
```

#### Useful Flags

Flags modify how commands work. They start with `-`:

```bash
ls -l
```

Shows a detailed list with file sizes, dates, and permissions.

```bash
ls -a
```

Shows *all* files, including hidden ones (files starting with `.`).

```bash
ls -la
```

Combine flags! Shows all files with details.

### `cd` - Move Around

Change Directory. Navigate to different folders.

```bash
cd Documents
```

Moves into the Documents folder.

#### Special Shortcuts

```bash
cd ~
```

Go to your home folder (the `~` always means home).

```bash
cd ..
```

Go up one level to the parent folder.

```bash
cd ../..
```

Go up two levels.

```bash
cd -
```

Go back to the previous folder you were in.

```bash
cd /
```

Go to the root of your file system.

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

### `rm` - Delete

Remove files.

```bash
rm unwanted-file.txt
```

Remove a folder and its contents:

```bash
rm -r unwanted-folder
```

⚠️ **Warning:** `rm` doesn't move files to Trash. They're permanently deleted. Be careful!

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

### `head` and `tail` - Partial Views

See the beginning or end of a file:

```bash
head -20 file.txt    # First 20 lines
tail -20 file.txt    # Last 20 lines
```

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
grep "background-color" styles.css
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

### `--help` Flag

Most commands have a help flag:

```bash
ls --help
```

### `tldr` - Simplified Help

Install `tldr` for friendlier help pages:

```bash
tldr ls
```

Shows practical examples instead of dense documentation.

## Keyboard Shortcuts

These will save you hours:

| Shortcut | Action |
|----------|--------|
| **Tab** | Autocomplete file/folder names |
| **↑ / ↓** | Browse previous commands |
| **Ctrl + C** | Cancel current command |
| **Ctrl + A** | Jump to start of line |
| **Ctrl + E** | Jump to end of line |
| **Ctrl + U** | Clear the current line |
| **Ctrl + R** | Search command history |
| **Ctrl + L** | Clear screen |

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

**Pro tip:** Avoid spaces in folder/file names for projects. Use hyphens or underscores: `my-documents`.

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

- Navigation: `pwd`, `ls`, `cd` are your core tools
- Files: `mkdir`, `touch`, `cp`, `mv`, `rm` for management
- Reading: `cat`, `less`, `head`, `tail` for viewing contents
- Finding: `find` and `grep` for locating files and text
- **Use Tab completion constantly.** It's your biggest time-saver.
- **Check your location with `pwd`** when unsure

## Next Steps

Continue to [Installing Tools](./03-installing-tools.md) →
