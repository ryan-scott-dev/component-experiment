require 'uglifier'

###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page '/path/to/file.html', :layout => false
#
# With alternative layout
# page '/path/to/file.html', :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page '/admin/*'
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy '/this-page-has-no-template.html', '/template-file.html', :locals => {
#  :which_fake_page => 'Rendering a fake page with a local variable' }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
# configure :development do
#   activate :livereload
# end

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     'Helping'
#   end
# end

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

set :relative_links, true

configure :development do
  set :debug_assets, true
end

# Build-specific configuration
configure :build do

  # Ignore everything except all.js and vendor.js
  Dir['source/javascripts/**/*.js*'].each do |f|
    next if File.basename(f) == 'all.js'
    next if File.basename(f) == 'vendor.js'

    ignore f.gsub('source/', '')
  end

  ignore 'development_assets/*'

  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript, compressor: Uglifier.new( output: { comments: :none } )

  activate :minify_html, remove_comments: false

  activate :gzip

  # Enable cache buster
  activate :asset_hash, ignore: [/^assets\/.*/]

  # Use relative URLs
  activate :relative_assets

  # Or use a different image path
  # set :http_prefix, '/Content/images/'
end

activate :app_cache do |config|
  config.cache = %w(index.html stylesheets/*.css javascripts/*.js assets/*)
end

aws = {
  bucket:'ryan-scott.me',

  cloudfront: 'CLOUDFRONT DISTRIBUTION ID',
  key: 'AWS KEY ID',
  secret: 'AWS SECRET KEY',
}

activate :s3_sync do |s3_sync|
  s3_sync.bucket                     = aws[:bucket]
  s3_sync.aws_access_key_id          = aws[:key]
  s3_sync.aws_secret_access_key      = aws[:secret]
  s3_sync.prefix = 'component-experiment'
end

caching_policy 'text/html', max_age: 0, must_revalidate: true, public: true
caching_policy 'text/css', max_age: (60 * 60 * 24 * 365), must_revalidate: false, proxy_revalidate: false, public: true
caching_policy 'application/javascript', max_age: (60 * 60 * 24 * 365), must_revalidate: false, proxy_revalidate: false, public: true

activate :cloudfront do |cf|
  cf.access_key_id = aws[:key]
  cf.secret_access_key = aws[:secret]
  cf.distribution_id = aws[:cloudfront]
  cf.filter = /\.html$/i  # default is /.*/
end
