
# Change Log
All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).
 
## [Unreleased] - yyyy-mm-dd
 
Here we write upgrading notes for brands. It's a team effort to make them as
straightforward as possible.
 
### Added
- [PROJECTNAME-XXXX](http://tickets.projectname.com/browse/PROJECTNAME-XXXX)
  MINOR Ticket title goes here.
- [PROJECTNAME-YYYY](http://tickets.projectname.com/browse/PROJECTNAME-YYYY)
  PATCH Ticket title goes here.
 
### Changed
 
### Fixed
 
## [0.0.1] - 2022-04-18
  
To use this version of the boilerplate, you may install Docker. If you opt to not use the included docker-compose.yml, you will need to provide a Redis database connection string.

### Added
- Dockerfile using Node:Alpine
- Docker Compose including Redis
- Added @apollo/client
 
### Changed
  
- Removed react-apollo, apollo-boost
- Removed duplicate dependencies in package.json
- Updated Next to version 12.1.5
- Updated ioredis to version 5.0.4
- Updated ioredis types to version 4.28.10
- Updated Shopify API to version 3.0.1
 
### Fixed
 
- Added "false" to the api/products --> Shopify.Utils.loadCurrentSession to make the app work out of the box
