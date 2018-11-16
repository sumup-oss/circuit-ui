import { spawn } from 'child_process';

const defaultOptions = {
  cwd: process.cwd(),
  detached: true
};

function getBufferContent(chunks) {
  return Buffer.isBuffer(chunks[0])
    ? Buffer.concat(chunks).toString('utf8')
    : null;
}

export default function asyncSpawn(cmd, args, options) {
  const stdout = [];
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      ...defaultOptions,
      ...options
    });

    child.stdout.on('data', chunk => {
      stdout.push(chunk);
    });

    child.on('close', code => {
      if (code !== 0) {
        // eslint-disable-next-line no-console
        // console.log(getBufferContent(stdout));
        const err = new Error(`${cmd} exited with an error (code ${code}).`);
        err.log = getBufferContent(stdout);
        reject(err);
      }

      resolve(getBufferContent(stdout));
    });

    child.on('error', err => {
      // eslint-disable-next-line no-console
      console.log(getBufferContent(stdout));
      reject(err);
    });
  });
}
