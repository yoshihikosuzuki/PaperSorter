# PaperSorter

A proof-of-concept paper (and any other files) management application with Electron and React + Redux.

## How to install and start

```bash
$ git clone https://github.com/yoshihikosuzuki/PaperSorter
$ cd PaperSorter
$ npm install
$ npm run build
$ npm start
```

## Motivation

I am personally not satisfied with the currently existing programs for paper management, e.g. Mendeley, Zotero, ReadCube, etc. Features I ultimatelly wish paper management software to have are as follows:

- **No specialized file viewer/format (= use default viewer of the device)**

  - Built-in PDF viewers and specialized formats for highlights/notes increase the dependency to specific software. I prefer using a default format and viewer installed in the device. To my knowledge, only Zotero uses the default viewer of the device.

- **No built-in cloud service**

  - This is similar as above. I prefer using any other service independent from the paper management software for it. A function of connecting to cloud service like Dropbox and Google Drive would be fine.

- **Manage files with a tree of checkboxes of tags**

  - Most existing software employs a combination of i) a tree of folders and ii) tags. I believe this is redundant and not optimal. I instead propose this UI where each file can have multiple tags. Then we need to offer following operations:
  
    1. Given a file, show a list of tags the file belongs to (as Mendeley does), and
    2. Given tag(s), show a list of files in the tag(s).

- (Attach any files to a paper)

- (Support .bib files, thumbnails, memos, ...)


## Note

PaperSorter does not have a function of metadata search for registered papers. Therefore, I highly recommend using it with [Zotero](https://www.zotero.org/) and [zotfile](http://zotfile.com/) as follows:

1. Create a sinlge collection folder in Zotero named, for example, `All`.
2. Change the Zotero setting so that it automatically renames the input PDF file name based on its metadata.
3. Change the zotfile setting so that it moves PDF files from Zotero's original directory to a directory specified by the `Manage Attachments` -> `Rename Attachments` option.
4. Then files are added as follows:
   1. Put papers in the `All` folder of Zotero
   2. Select all papers and do `Rename Attachments` as described above
   3. Open the moved (and renamed) files in PaperSorter

Any file added to PaperSorter has, at first, a single pre-defined tag `unclassified`.

## Simple GIF of usage examples

### Add a paper

![](https://github.com/yoshihikosuzuki/PaperSorter/blob/master/assets/add_a_paper.gif)

### Edit tags of a paper

![](https://github.com/yoshihikosuzuki/PaperSorter/blob/master/assets/edit_tags.gif)
