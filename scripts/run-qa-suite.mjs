import { spawn } from 'child_process';
import http from 'http';

function waitForServer(url, timeout = 15000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      http
        .get(url, (res) => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 400) {
            resolve();
          } else {
            setTimeout(check, 300);
          }
        })
        .on('error', () => {
          if (Date.now() - start > timeout) {
            reject(new Error('Server did not start in time'));
          } else {
            setTimeout(check, 300);
          }
        });
    };
    check();
  });
}

async function main() {
  console.log('📦 Starting Vite preview on port 3000...');
  const server = spawn('npx', ['vite', 'preview', '--port', '3000'], {
    cwd: process.cwd(),
    shell: true,
    stdio: 'inherit',
  });

  try {
    await waitForServer('http://localhost:3000');
    console.log('✓ Server is ready at http://localhost:3000.');

    console.log('🚀 Running QA Verification Script...');
    const qa = spawn('node', ['scripts/verify-full-qa.mjs'], {
      cwd: process.cwd(),
      shell: true,
      stdio: 'inherit',
    });

    await new Promise((resolve, reject) => {
      qa.on('close', (code) => {
        if (code === 0) resolve();
        else reject(new Error(`QA Suite failed with code ${code}`));
      });
    });
  } finally {
    console.log('🛑 Stopping server...');
    server.kill();
    // On Windows, child processes spawned with shell: true may need taskkill
    spawn('taskkill', ['/pid', String(server.pid), '/f', '/t'], { shell: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
