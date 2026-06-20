const express =
require("express");

const app =
express();

app.use(
    express.json()
);

const authRoutes =
require("./routes/auth.routes");

const workspaceRoutes =
require("./routes/workspace.routes");

const domainRoutes =
require("./routes/domain.routes");

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/workspaces",
    workspaceRoutes
);

app.use(
    "/api/domains",
    domainRoutes
);

const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});


module.exports = app;