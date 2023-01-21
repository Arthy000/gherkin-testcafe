const { writeFileSync } = require('fs');
const { join } = require('path');

const matrixPlaceholder = '%MATRIX%';
const mdDoublePipe = ' &#124;&#124; ';
const mdMatrixHeaders = `
| GTC version | TC versions (peer dependencies) | TC versions (not peer dependencies) |
| - | - | - |`;
const docTemplate = `Following combinations of versions of Gherkin-TestCafe and TestCafe have been tested and are compatible.

${matrixPlaceholder}

\`TC versions (not peer dependencies) \` are compatible with the corresponding GTC version. 
However, they were not included in the peer dependencies of the package at the time of release, 
thus they will trigger a warning during the installation process.
`;

// to run after release generation but before release publish
const updateMatrix = () => {
  const jsonPath = join(__dirname, './version-matrix.json');
  const { version: currentGTCVersion, peerDependencies } = require('../package.json');
  const { testcafe: tcVersions } = peerDependencies;
  const newVersion = {
    gtc: currentGTCVersion,
    tc: { peer: tcVersions.split(' || ') },
  };

  const previousMatrix = require(jsonPath);
  if (previousMatrix.find(({ gtc }) => gtc === currentGTCVersion)) {
    return;
  }

  const newMatrix = [newVersion, ...previousMatrix];
  writeFileSync(jsonPath, JSON.stringify(newMatrix));

  const mdMatrix = newMatrix.reduce(
    (acc, { gtc, tc }) => `${acc}
| ${gtc} | ${tc.peer.join(mdDoublePipe)} | ${tc.notPeer || '/'} |`,
    mdMatrixHeaders
  );
  writeFileSync('./version-matrix.md', docTemplate.replace(matrixPlaceholder, mdMatrix));
};

updateMatrix();
