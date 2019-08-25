# PaperSorter

A proof-of-concept paper management application with Electron and React + Redux.



## How to use

```bash
$ git clone https://github.com/yoshihikosuzuki/PaperSorter
$ cd PaperSorter
$ npm install
$ npm run build
$ npm start
```



## Motivation

I am not satisfied with the current applications for paper management, e.g. Mendeley, Zotero, etc.



* The application should only **manage** local files which a user selected and should **NOT** have functions for **cloud synchronization** nor **specialized viewer**. Built-in implementations of such redundant functions make the degree of dependence to the specific application higher, and these functions should be realized by external service like Dropbox and a PDF viewer provided by the device.
  * To my knowledge, only Zotero uses the default viewer of the device. Mendeley, ReadCube, and Zotero offer cloud sync function, but all of them can handle local file and folder system.
* The files should be managed not by combination of a tree-structured list of folders difficult to determine which folder(s) a file belongs to and attributes of dispersed tags difficult to manage, but only by **a tree-structured checkbox list of tags**. At this time, the tags play roles of both folders and tags in the original style, and each file can have multiple tags (realized by the checkboxes).
  * To my knowledge, none of the current paper manegement applications employ this structure.
* Given a set of tags, the files which have the tags should be quickly displayed. And given a file, the tags which the file has should be quickly displayed.
  * To my knowledge, all the current applications have the former function, but only Mendeley has the latter function.



## Features

* No built-in file viewer (uses default viewer of the device)
* No built-in cloud file synchronization (handles only local files)
* File management by a tree-structured checkbox list of tags
* Tag highlight of the selected file
* Simple in-page string search



## Note

PaperSorter does not have a function of metadata search for registered papers. Therefore, I highly recommend using it with Zotero (and zotfile) as follows:

1. Create a sinlge collection folder in Zotero named, for example, `All`
2. Change the Zotero setting so that it automatically renames the input PDF file name based on its metadata
3. Install zotfile and change the zotfile setting so that it moves PDF files from Zotero's original directory to a directory specified using Right click -> `Manage Attachments` -> `Rename Attachments` option
4. 1) Put papers in `All` of Zotero, 2) select all papers and do `Rename Attachments` above, and then 3) open the moved files in PaperSorter



## Simple GIFs

### Add a paper

![](https://github.com/yoshihikosuzuki/PaperSorter/blob/master/assets/add_a_paper.gif)

### Edit tags of a paper

![](https://github.com/yoshihikosuzuki/PaperSorter/blob/master/assets/edit_tags.gif)