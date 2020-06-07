const fs = require('fs');
const path = require('path');

function getSiteMapXML(sitemapData) {
  return /* html */ `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${
    sitemapData.map(entry => /* html */ `
    <url>
      <loc>${entry.loc}</loc>
      ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
      <changefreq>${entry.changefreq}</changefreq>
      <priority>${entry.priority}</priority>
    </url>
    `).join('')
    }
  </urlset> 
  `
}

const afterBuild = (programInfo) => {
  if (programInfo.task === 'serve') return;
  const globalMeta = programInfo.vars.globalMeta;
  if (!globalMeta.domain) {
    console.error(">> SiteMap plugin: globalMeta in abell.config.js should have property 'domain' to build sitemap");
    return;
  }

  const sitemapData = [
    {
      loc: globalMeta.domain,
      changefreq: 'monthly',
      priority: 0.5
    },
    ...programInfo.vars.$contentArray.map(meta => {
      const modifiedDate = new Date(meta.$modifiedAt);
      const lastmod = modifiedDate.toISOString();
      return {
        loc: path.join(globalMeta.domain, meta.$path),
        lastmod,
        changefreq: 'monthly',
        priority: 0.5
      }
    })
  ]

  fs.writeFileSync(
    path.join(programInfo.abellConfigs.destinationPath, 'sitemap.xml'), 
    getSiteMapXML(sitemapData)
  )

  console.log('...Built sitemap.xml');
}

module.exports = { afterBuild }