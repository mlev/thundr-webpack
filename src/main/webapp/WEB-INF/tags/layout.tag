<%@ tag dynamic-attributes="dynAttrs" %>
<%@ attribute name="title" required="false"%>
<%@ attribute name="description" required="false"%>
<%@ attribute name="keywords" required="false"%>
<%@ attribute name="styles" required="false"%>
<%@ attribute name="scripts" required="false"%>
<%@ taglib prefix="t" uri="http://threewks.com/thundr/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags"%>
<!doctype html>
<html class="no-js"
	  lang="en"
	  itemscope="" itemtype="http://schema.org/WebPage">
<head>
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<title>${title}</title>
	<meta name="description" itemprop="description" property="og:description" content="${description}"/>
	<meta name="keywords" content="${keywords}"/>
	<meta property="og:title" content="${title}" />
	<meta property="og:type" content="website" />

	<meta name="viewport" content="width=device-width, initial-scale=1">

	${styles}
<link rel="apple-touch-icon" sizes="57x57" href="/static/images/favicon/apple-touch-icon-57x57.png"><link rel="apple-touch-icon" sizes="60x60" href="/static/images/favicon/apple-touch-icon-60x60.png"><link rel="apple-touch-icon" sizes="72x72" href="/static/images/favicon/apple-touch-icon-72x72.png"><link rel="apple-touch-icon" sizes="76x76" href="/static/images/favicon/apple-touch-icon-76x76.png"><link rel="apple-touch-icon" sizes="114x114" href="/static/images/favicon/apple-touch-icon-114x114.png"><link rel="apple-touch-icon" sizes="120x120" href="/static/images/favicon/apple-touch-icon-120x120.png"><link rel="apple-touch-icon" sizes="144x144" href="/static/images/favicon/apple-touch-icon-144x144.png"><link rel="apple-touch-icon" sizes="152x152" href="/static/images/favicon/apple-touch-icon-152x152.png"><link rel="apple-touch-icon" sizes="180x180" href="/static/images/favicon/apple-touch-icon-180x180.png"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><meta name="apple-mobile-web-app-title" content="thundr-webpack"><meta name="msapplication-TileColor" content="#fff"><meta name="msapplication-TileImage" content="mstile-144x144.png"><meta name="msapplication-config" content="browserconfig.xml"><link rel="icon" type="image/png" sizes="32x32" href="/static/images/favicon/favicon-32x32.png"><link rel="icon" type="image/png" sizes="192x192" href="/static/images/favicon/android-chrome-192x192.png"><link rel="icon" type="image/png" sizes="16x16" href="/static/images/favicon/favicon-16x16.png"><link rel="shortcut icon" href="/static/images/favicon/favicon.ico"></head>
<body <c:forEach items="${dynAttrs}" var="dynAttr">${dynAttr.key}="${dynAttr.value}"</c:forEach> >
	<div id="content">
		<jsp:doBody/>
	</div>
	<div id="scripts">
		${scripts}
	</div>
<script type="text/javascript" src="/static/bundle.js?afa3338d27d10d492f0a"></script></body>
</html>
