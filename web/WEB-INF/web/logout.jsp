<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2014/11/25
  Time: 9:42
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
    <%
        request.getSession().getAttribute("user");
        session.invalidate();
        response.sendRedirect("/login.html");

    %>
</head>
<body>

</body>
</html>
