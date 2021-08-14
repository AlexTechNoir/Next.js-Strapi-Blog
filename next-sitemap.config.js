module.exports = {
  siteUrl: 'https://next-js-strapi-blog.vercel.app',
  sitemapSize: 50000,
  exclude: ['/search'],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: 'Googlebot-Image',
        disallow: '/'
      },
      {
        userAgent: '*',
        disallow: '/search'
      },
      {
        userAgent: '*',
        allow: '/'
      }
    ]
  }
}