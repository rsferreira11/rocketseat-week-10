const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },
  async store(req, res) {
    const { github_username: githubUsername, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username: githubUsername });

    if (!dev) {
      const githubResponse = await axios.get(`https://api.github.com/users/${githubUsername}`);

      const { name = login, avatar_url, bio } = githubResponse.data;
      const techFormatted = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [ longitude, latitude ]
      };

      dev = await Dev.create({
        github_username: githubUsername,
        name,
        avatar_url,
        bio,
        techs: techFormatted,
        location
      });

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techFormatted
      );

      sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }

    return res.json(dev);
  }
}
