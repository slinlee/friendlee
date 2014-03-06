Package.describe({
  summary: "jquery isotope"
});

Package.on_use(function (api) {
  api.use('jquery', 'client');
  api.imply('jquery', 'client');  
  api.add_files(["jquery.isotope.js",
		"style.css" ], 'client');
});
