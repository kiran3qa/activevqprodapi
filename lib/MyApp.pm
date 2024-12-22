package MyApp;
use Mojo::Base 'Mojolicious';
use DBI;
use strict;
use warnings;

sub startup {
    my $self = shift;

    # DSN-less connection string
    my $dsn = "DBI:ODBC:Driver={ODBC Driver 17 for SQL Server};Server=SQL1001.site4now.net;Database=db_ab09c2_vqapi;";
    my $user = 'db_ab09c2_vqapi_admin';
    my $password = 'Kini@1341';

    # Establish DB connection
    my $dbh = DBI->connect($dsn, $user, $password, {
        RaiseError => 1,
        AutoCommit => 1,
    }) or die "DB Connection Error: $DBI::errstr";

    # Make DB handle available as a helper
    $self->helper(db => sub { $dbh });

    # Define routes
    my $r = $self->routes;
    # $r->get('/')->to('example#welcome');
    $r->post('/auths/login')->to('auth#auth');
}
1;
