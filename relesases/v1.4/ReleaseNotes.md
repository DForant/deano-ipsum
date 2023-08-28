## DeanoIpsum Version 1.04
**Release Date: 08/28/2023**

> DeanoIpsum: A collection of Theme based Lorem Ipsum Generators

### Upgrade Steps
* Before starting, make sure that you have a backup copy of the working app
* Using an FTP Client, access the directory where the app is installed and delete the following:
  * The Assets folder (and its contents)
  * The index.html file.
* Copy the Zip file from the desired release (i.e 1.0zip, 1.2zip, etc...) over to the working directory
* Extract the contents of the zip file into the working directory.
  * Note: If by chance your remote file manager does not let you extract directly into the directory, you can extraxct the contents of your zip files and upload them individually,
* Once you verify that the upgrade works without issue, you can delete the zip file from the remote working directory.

### Breaking Changes
* N/A
* 

### New Features
* No New Fetures This release
* 

### Bug Fixes
* Minor style issues
* 

### Performance Improvements
* Refactored the Code to utilize the useReducer Hook as well as the global context
* 

### Other Changes
* Because the navigator.clipboard does not work via normal http requests, we added a message informing the use to manually copy the text from the text area.
* 
