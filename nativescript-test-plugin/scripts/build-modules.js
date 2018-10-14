const childProcess = require('child_process');
const fs = require('fs-extra');
const path = require('path');

async function buildAndroidModule(moduleName) {
    const projectPath = path.join('modules-src', 'android');

    await new Promise((resolve, reject) => {
        const child = childProcess.spawn(
            path.join(projectPath, process.platform === 'win32' ? 'gradlew.bat' : 'gradlew'),
            [
                '--build-file',
                path.join(projectPath, 'build.gradle'),
                'build'
            ]
        )
            .on('error', reject)
            .on('close', (code, signal) => {
                if (code) {
                    reject(new Error(signal));
                } else {
                    resolve();
                }
            });
        child.stdout.pipe(process.stdout);
        child.stderr.pipe(process.stderr);
    });

    console.log('copying aar...');
    await fs.copy(
        path.join(projectPath, moduleName, 'build', 'outputs', 'aar', `${moduleName}-release.aar`),
        path.join('platforms', 'android', `${moduleName}.aar`),
    )
    console.log('done');
}

buildAndroidModule('testplugin').catch((err) => {
    console.error(err.stack);
    process.exit(1);
})
