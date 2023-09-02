// All imports
const fs = require('fs');
const path = require('path');

// All paths
const sourceDirectory = './data1.txt';
const destinationDirectory = './data2.txt';

// recursive function
function copyRecursive(source, destination, callback) {
    const sourceStream = fs.createReadStream(source);
    const destinationStream = fs.createWriteStream(destination);

    sourceStream.pipe(destinationStream);

    sourceStream.on('error', callback);
    destinationStream.on('error', callback);
    destinationStream.on('finish', callback);
}
  
// function to copy files or directory
function copyFileOrDirectory(source, destination, callback) {
    fs.stat(source, (err, stats) => {
        if (err) {
        callback(err);
        return;
        }

        if (stats.isFile()) {
        copyRecursive(source, destination, callback);
        } else if (stats.isDirectory()) {
        const destinationDir = path.join(destination, path.basename(source));
        fs.mkdir(destinationDir, (err) => {
            if (err) {
            callback(err);
            } else {
            fs.readdir(source, (err, files) => {
                if (err) {
                callback(err);
                } else {
                async function copyFiles() {
                    for (const file of files) {
                    const sourcePath = path.join(source, file);
                    const destinationPath = path.join(destinationDir, file);
                    await new Promise((resolve) => {
                        copyFileOrDirectory(sourcePath, destinationPath, resolve);
                    });
                    }
                }
                copyFiles().then(() => {
                    callback(null);
                });
                }
            });
            }
        });
        }
    });
}

// calling the function
copyFileOrDirectory(sourceDirectory, destinationDirectory, (err) => {
    if (err) {
    console.error('Backup failed:', err);
    } else {
    console.log('Backup completed successfully.');
    }
});
  
  
