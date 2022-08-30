# convert-txt-LF-CRLF

This text files converter, have the purpose of the convert files with LF end lines (\n) following the UNIX pattern, into files with CRLF (\r\n) that is the DOS pattern.
The user can make upload of the files to convert, node will receive this files, save him on the "uploads" directory, convert using a DOS command that has executed using "child_process" native module of NodeJS, them zip the folder of converted files and send them back to the user on a zipped folder.

Modules used on this project:
- Express => Routes administration.
- Cors => CORS policy configuration.
- Body-Parser => Parse body of the requests.
- Adm-zip => Zip the folder with converted files.
- Multer => Upload and storage files.

Thanks for looking!
