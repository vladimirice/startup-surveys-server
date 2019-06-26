const NODE_ENV = 'test';
const busyPorts = [];

function getAppConfig(nameSuffix, script, port) {
  if (busyPorts.includes(port)) {
    throw new Error(`Port ${port} is already assigned`);
  }

  busyPorts.push(port);

  return {
    name: `${NODE_ENV}-${nameSuffix}`,
    script: `build/${script}`,

    env: {
      PORT: port,
      NODE_ENV,
    },

    instance_var: 'INSTANCE_ID',
    watch:        true,
    autorestart:  true,
    ignore_watch: ['node_modules', 'public', 'logs'],
  }
}

module.exports = {
  apps: [
    getAppConfig('api-application', '/api/api-bin.js', 5000),
  ],
};
