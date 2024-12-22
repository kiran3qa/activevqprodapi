package MyApp::Controller::Auth;
use Mojo::Base 'Mojolicious::Controller';
use strict;
use warnings;

# In-memory item storage (for demo purposes)
# my $items = {};
# my $id_counter = 1;

# Authentication placeholder (skip for now)
sub auth {

    # my $self = shift;
    # $self->render(json => {"response" => "this is api response"});

    my $self = shift;
    my $dbh = $self->app->db;

    my $reqBody = $self->req->json;
    my $userStatus = 1;

    my $sth = $dbh->prepare("SELECT urole FROM appusers WHERE email =? AND passcode= ? AND ustatus =?");
    $sth->execute($reqBody->{email},$reqBody -> {passcode}, $userStatus);

    my @items;
    while (my $row = $sth->fetchrow_hashref) {
        push @items, $row;
    }

    $self->render(json => \@items);

}

1;
