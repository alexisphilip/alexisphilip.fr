<style>
    /*@import url('https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap');*/
    /*@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');*/
    /*@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');*/
    /*@font-face {*/
    /*    font-family: "IBM";*/
    /*    src: url("static/fonts/PxPlus_IBM_EGA8.ttf");*/
    /*}*/

    :root {
        --green: #19AC14;
        --blue: #1779E0;
        --light: #C1C1C1;
    }

    html,
    body {
        height: 100%;
        width: 100%;
    }

    body {
        background: #1B1B1D;
        padding: 0 40px 40px 40px;
        margin: 0;

        display: flex;
        flex-direction: column;

        /*font-family: 'Major Mono Display', Consolas, monospace, sans-serif;*/
        /*font-family: 'VT323', Consolas, monospace, sans-serif;*/
        /*font-family: 'Share Tech Mono', Consolas, monospace, sans-serif;*/
        /*font-family: 'IBM', Consolas, monospace, sans-serif;*/
        font-family: Consolas, monospace, sans-serif;
        font-size: 1.3em;
        color: var(--light);
    }
    * {
        box-sizing: border-box;
    }

    a {
        color: var(--blue);
    }

    .terminal {
        overflow-y: scroll;
        padding: 20px;
        height: 100%;
        /*border: 1px solid var(--green);*/
        box-shadow: 0 0 5px rgba(72,239,67, 0.7);
    }

    .base-line {
        width: 100%;
        display: flex;
    }

    .server-name {
        color: var(--green);
    }

    .terminal-tilde {
        color: var(--blue);
    }

    .terminal-output {
        /*display: flex;*/
        /*flex-direction: column-reverse;*/
    }
    .terminal-input {
        background: none;
        border: none;
        color: inherit;
        font-weight: inherit;
        font-size: inherit;
        font-family: inherit;
        width: 100%;
    }
    .terminal-input:focus {
        outline: 0;
    }
</style>

<h1>404 NOT FOUND</h1>

<p>The page you are looking for does not exist.</p>
<p>Type "<strong>help</strong>" to see all commands.</p><br>

<div class="terminal">
    <div class="terminal-output"></div>
    <div class="base-line">
        <span class="server-name">404@alexisphilip.fr</span>:<span class="terminal-tilde">~</span>#&nbsp;
        <input type="text" class="terminal-input" value="">
    </div>
</div>
