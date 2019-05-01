# BaconVision
## A Client Agnostic ETH2.0 Beacon Chain Visualizer

1. `git clone https://github.com/baconviewer/bacon-vision.git`
2. `cd bacon-vision`
3. `npm install`

## To connect BaconVision to the Artemis client

4. `git clone https://github.com/PegaSysEng/artemis.git`
5. `cd artemis`
6. `git submodule update --init --recursive`
7. `./gradlew build`
8. `./gradlew run --args='-p=JSON -o=artemis.json'`

9. Edit ther package.json in BaconVision to reflect the path to `artemis.json`
`"start": "node server/server.js -p '[PATH_TO_ARTEMIS_JSON]' & react-scripts start"`
10. cd to the `bacon-vision` directory
11. `npm start`
