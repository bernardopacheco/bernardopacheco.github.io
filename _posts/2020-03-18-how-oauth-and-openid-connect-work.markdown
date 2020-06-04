---
layout: post
title:  "How OAuth 2.0 and OpenID Connect Work"
description: Notes on how OAuth 2.0 and OpenID Connect work.
permalink: /how-oauth-and-openid-connect-work
---

I've been working with OAuth 2.0 and OpenID Connect for the last 4 years configuring different clients and integrating systems. It was challenging to learn and grasp the terminology and jargon. I had the chance to <a href="https://github.com/keycloak/keycloak-nodejs-connect/pull/189#issuecomment-484452321" target="_blank">contribute to the open source Keycloak Node.js adapter</a> and gained experience with <a href="https://www.keycloak.org/" target="_blank">Keycloak</a> while working for <a href="https://zwift.com" target="_blank">Zwift</a>. 
Along the way, I took notes about this protocol and decided to write this article for myself to refresh my memory when I need to. I hope it can be valuable to you too.

<!--excerpt_separator-->

 Although a search in Google about this protocol often returns confused and contradictory explanations, I recommend <a href="https://www.youtube.com/watch?v=996OiexHze0" target="_blank">this video</a> and <a href="https://www.oauth.com" target="_blank">this ebook</a> as helpful resources for further explanation.

## The Delegate Authorization Problem

OAuth 2.0 was conceived to tackle the following scenario. Suppose this blog wants to get the reader’s Google information such as their contact list. 

*How can I let this blog access the reader's Google information without giving the blog the user's Google password?*

Before describing the OAuth 2.0 flows, let's declare the terminology:

- **Resource owner**: you and me; who owns the data
- **Client**: the application which wants to access the data. E.g., this blog
- **Authorization server**: the system in which I log in and say "Yes" to allow another system to get my data. E.g., Google
- **Resource server**: API or the system that actually holds the data that the client wants to get to. E.g., Google's Contact API
- **Authorization grant**: proves the resource owner clicked "Yes"
- **Redirect URI**: client's callback after user click "Yes"
- **Access token**: a key the client uses to get into whatever the data that I granted access to or granted permission to on the resource server
- **Back channel**: a highly secure channel; server to server communication
- **Front channel**: a less secure channel; browser to server communication. A browser can easily leak information


## Authorization code flow

The authorization code flow is used to obtain an access token to authorize API requests. 

[![Authorization code flow](/assets/images/posts/2020-03-18-how-oauth-and-openid-connect-work/oauth-authorization-code.png "Authorization code flow")](/assets/images/posts/2020-03-18-how-oauth-and-openid-connect-work/oauth-authorization-code.png)

### #1 Starting the flow

{% highlight makefile %}

https://accounts.google.com/o/oauth2/v2/auth?
  client_id=foobar&
  redirect_url=http://bernardopacheco.net/callback&
  scope=profile&
  response_type=code&
  state=abcdef

{% endhighlight %}

### #2 Calling back

{% highlight makefile %}

http://bernardopacheco.net/callback?
  error=access_denied&
  error_description=The user did not consent.

http://bernardopacheco.net/callback?
  code=zuzuRerfdg543ljf023&
  state=abcdef

{% endhighlight %}

### #3 Exchange code for an access token

{% highlight makefile %}

POST www.googleapis.com/oauth2/v4/token
Content-Type: application/x-www-form-urlencoded

code=zuzuRerfdg543ljf023&
client_id=foobar&
client_secret=secret123&
grant_type=authorization_code

{% endhighlight %}

<small>Authorization server returns an access token:</small>

{% highlight json %}

{
  "access_token": "lkmlsdJsdf034fksfere23L",
  "expires_in": 3920,
  "token_type": "Bearer"
}

{% endhighlight %}

### #4 Use the access token

{% highlight makefile %}

GET api.google.com/some/endpoint
Authorization: Bearer lkmlsdJsdf034fksfere23L

{% endhighlight %}

## Implicit flow

The Implicit flow is a simplified OAuth 2.0 flow recommended for JavaScript apps where the access token is returned immediately without an extra authorization code exchange step on the server side.

The distinction is:

- **Authorization code**: front channel + back channel
- **Implicit**: front channel only. Useful when there is a pure JavaScript application. Not secure as the authorization code because the token is exposed on the browser and it can be stolen

[![Implicit flow](/assets/images/posts/2020-03-18-how-oauth-and-openid-connect-work/oauth-implicit.png "Implicit flow")](/assets/images/posts/2020-03-18-how-oauth-and-openid-connect-work/oauth-implicit.png)


## OpenID Connect

OAuth 2.0 was conceived to provide authorization, but the industry massively adopted it and overused it for authentication. Each company started its own "hack" to provide social login. To cover this lack of specification, **OpenID Connect** was created as not a separated protocol, but as an OAuth 2.0 extension adding the missing functionalities of authentication.

OpenID Connect adds:

- ID token
- Userinfo endpoint for getting more user information
- Well defined implementation

An access token does not tell anything about the user, it is all about scope. The ID token returns info about the user. If for some reason it is needed more info, there is an endpoint for it.



### Calling the userinfo endpoint

{% highlight makefile %}

GET www.googleapis.com/oauth2/v4/userinfo
Authorization: Bearer lkmlsdJsdf034fksfere23L

{% endhighlight %}

<small>Resource server returns user info:</small>

{% highlight json %}

{
  "sub": "you@gmail.com",
  "name": "Bernardo Pacheco",
  "profile_picture": "http://plus.g.co/123"
}

{% endhighlight %}

## Conclusion

The recommendation is:

- Use OAuth 2.0 for **authorization** scenarios to:
  - Grant access to your API
  - Get access to user data in other systems

- Use OpenID Connect for **authentication** scenarios to:
  - Log in users
  - Making your accounts available in other systems
 
