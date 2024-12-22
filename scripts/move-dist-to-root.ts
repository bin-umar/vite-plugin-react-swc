import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const rootDir = path.resolve(__dirname, '..');

async function moveDistToRoot(): Promise<void> {
    try {
        const files = await fs.readdir(distDir);

        for (const file of files) {
            const srcPath = path.join(distDir, file);
            const destPath = path.join(rootDir, file);

            // Move files or directories
            await fs.rename(srcPath, destPath);
        }

        // Remove the now-empty `dist` directory
        await fs.rmdir(distDir, { recursive: true });

        console.log('Moved all files from "dist" to the root directory successfully.');
    } catch (error) {
        console.error('Error moving files from "dist" to the root:', error);
        process.exit(1);
    }
}

// Execute the function
moveDistToRoot();
