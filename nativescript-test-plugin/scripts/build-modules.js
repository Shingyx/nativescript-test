const childProcess = require('child_process');
const fs = require('fs-extra');
const path = require('path');

async function buildAndroidModule() {
    const modulePath = path.join('.', 'modules-src', 'android');

    await new Promise((resolve, reject) => {
        const child = childProcess.spawn(
            path.join(modulePath, process.platform === 'win32' ? 'gradlew.bat' : 'gradlew'),
            [
                '--build-file',
                path.join(modulePath, 'build.gradle'),
                'clean',
                'build'
            ]
        );
        child.stdout.on('data', (d) => process.stdout.write(d));
        child.stderr.on('data', (d) => process.stderr.write(d));
        child.on('error', reject);
        child.on('exit', (code, signal) => {
            if (code) {
                reject(new Error(signal));
            }
        });
        child.on('close', resolve);
    });

    console.log('copying aar...');
    await fs.copy(
        path.join(modulePath, 'testplugin', 'build', 'outputs', 'aar', 'testplugin-release.aar'),
        path.join('platforms', 'android', 'testplugin.aar'),
    )
    console.log('done');
}

buildAndroidModule().catch((err) => {
    console.error(err.stack);
    process.exit(1);
})
