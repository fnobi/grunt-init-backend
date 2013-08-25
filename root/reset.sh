cd {%= project_path %}
rm -rf *
grunt-init {%= template_name %}{% if (!pkg.dependencies.length) { %}
npm link {%
  for (var pkgname in pkg.dependencies) {
    %}{%= pkgname %}@{%= pkg.dependencies[pkgname] %} {%
  }
%}{% } %}