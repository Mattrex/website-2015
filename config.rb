require 'slim'
require 'builder'

activate :i18n, :mount_at_root => :fr

activate :google_analytics do |ga|
  ga.tracking_id = 'UA-XXXXX' # Replace with your property ID.
end

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

ignore 'partials/*'
# ignore 'portfolio/*'

page "/feed.xml", layout: false
page "/404.html", layout: false
page "/sitemap.xml", layout: false

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (https://middlemanapp.com/advanced/dynamic_pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

# data.portfolio.projects.each do |project|
#   proxy "/portfolio/#{project.url}.html", "/portfolio/project.html", locals: {
#     project: project
#   }, ignore: true
# end

activate :directory_indexes

activate :middleman_simple_thumbnailer

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Methods defined in the helpers block are available in templates
helpers do
  def nav_active(page)
    current_page.url.start_with?(page) ? {:class => 'active'} : {}
  end

  def page_title
    if content_for?(:title)
      "#{yield_content(:title)} - Marie-Hélène Tremblay"
    else
      "Marie-Hélène Tremblay"
    end
  end
end

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

set :build_dir, 'build'

# Build-specific configuration
configure :build do
  activate :minify_html

  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  activate :gzip

  # Enable cache buster
  activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
