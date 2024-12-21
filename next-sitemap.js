module.exports = {
  siteUrl: process.env.SITE_URL || '',  // Your production site URL
  generateRobotsTxt: true,  // Generate robots.txt
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [

    "/verifyemail",
  ],  // Exclude certain pages if necessary
};
