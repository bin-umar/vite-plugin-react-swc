const fs = require('fs-extra');
const path = require('path');

const distDir = path.resolve(__dirname, '../dist');
const rootDir = path.resolve(__dirname, '..');

async function moveDistToRoot() {
    try {
        const files = await fs.readdir(distDir);

        for (const file of files) {
            const srcPath = path.join(distDir, file);
            const destPath = path.join(rootDir, file);

            await fs.move(srcPath, destPath, { overwrite: true });
        }

        // Remove the now-empty `dist` directory
        await fs.remove(distDir);

        console.log('Moved all files from "dist" to the root directory successfully.');
    } catch (error) {
        console.error('Error moving files from "dist" to the root:', error);
        process.exit(1);
    }
}

moveDistToRoot();
