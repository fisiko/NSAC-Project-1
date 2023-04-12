<!DOCTYPE HTML>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pseudo Classes and Elements</title>
    <style type="text/css">
        @font-face {
            font-family: Amatic;
            src: url(AmaticSC-Bold.ttf);
        }

        @font-face {
            font-family: Lucida;
            src: url('Lucida Console Regular.ttf');
        }

        @media only screen and (min-width: 1000px) {

            /* layout for pc */
            body {
                font: 24px 'Amatic', cursive;
                position: relative;
                width: 100%;
                background-color: lightblue;
            }

            article.alumni {
                text-align: center;
            }

            .horz_or_vert {
                float: left;
                width: 20%;
                padding: 5px;
            }

            /* Clear floats after image containers */
            .row::after {
                content: "";
                clear: both;
                display: table;
            }

            article.films {
                text-align: center;
            }
        }

        article.films>ul,
        ol {
            list-style-position: inside;
        }



        @media only screen and (max-width: 1000px) {
            /* layout for tablet */

            body {
                font: 18px 'Amatic', cursive;
                position: relative;
                width: 100%;
                background-color: lightgreen;
            }

            article.alumni {
                text-align: center;
            }

            article.films {
                text-align: left;
            }
        }


        @media only screen and (max-width: 600px) {
            body {
                font: 12px 'Amatic', cursive;
                position: relative;
                width: 100%;
                background-color: lightpink;
            }

            article.alumni {
                text-align: left;
            }

            article.films {
                text-align: left;
            }

            article.form {
                display: none;
            }
        }
    </style>
</head>

<body>
    <h1>Wonkymotion - A film company for our times</h1>

    <article>
        <h2>Wonkymotion History</h2>
        <p>Wonkymotion started out at the beginning of the pandemic in 2020 simply as an time filling exercise to
            relieve the bordom of lockdown. From the first few tentative productions Wonkymotion has now flourished into
            the world dominating force that it's become today.</p>
        <p>The company's sizable studios are located in a secret location in Kent which is watched over by a ferocious
            chariot driving guard dog.</p>
    </article>

    <article>
        <h3>Signature Vanity Logo</h3>
        <p>Wonkymotion's now infamous Vanity logo that pictures a dog driving a chariot bedecked with bunting and backed
            by Stuart Copeland's "The Ascent of Man" tries to portray how, over the eons of time Wonkymotion have placed
            themselves at the pinnacle of evolution and creativity. Since its conception, It's almost as if the whole of
            creation has been waiting for Wonkymotion to arrive.</p>
        <p>Before the release of Postman Pat and the Heist, the company used a number of alternative Vanity logos
            including the mooing cow and the spot lights. Any resemblance to any other studio Vanity logos is entirely
            coincidental. </p>
    </article>


    <article class="alumni">
        <p>Wonkymotion's famous alumni actors include:</p>
        <div class="row">
            <div class="horz_or_vert"><img src="./DashAndTui.jpg" alt="Dash and Tui" width="200px"  />
                <p>Dash and Tui</p>
            </div>
            <div class="horz_or_vert"><img src="./DaisyDalek.jpg" alt="Daisy Dalek" width="200px"  /></p>
                <p>Daisy Dalek</p>
            </div>
            <div class="horz_or_vert"><img src="./ThomasArtimusOJones.jpg" alt="Thomas Artimus O'Jones"
                        width="200px"  /></p>
                <p>Thomas Artimus O'Jones</p>
            </div>
            <div class="horz_or_vert"><img id="pat" src="./Pat.jpg" alt="Pat" width="200px" /></p>
                <p>Pat</p>
            </div>
    </article>
    </p>
    <article class="films">
        <h3 class="innerbox">Wonkymotion Films:</h3>
        <ol start="1">
            <li><a href="https://www.youtube.com/watch?v=VklXDDIeZKg&t=15s" target="_blank">
                    Postman <small>Pat</small> and the Heist
                </a></li>
            <li><a href="https://www.youtube.com/watch?v=4q6z1FMS_mM" target="_blank">
                    Thunderbirds are <small>Go!</small>
                </a></li>
            <li><a href="https://www.youtube.com/watch?v=ENrgZ4KAnNw&t=4s" target="_blank">
                    Where <small>Eagles</small> Dare
                </a></li>
            <li><a href="https://www.youtube.com/watch?v=kFZiKoImFaw" target="_blank">
                    Hair Today - <small>Everyday</small> life with the Daleks
                </a></li>
            <li><a href="https://www.youtube.com/watch?v=KktUJBh18AQ" target="_blank">
                    Trumpety <small>Trump</small>
                </a></li>
        </ol>


        <br />
        Netflix Films:
        <ul>
            <li><a href="https://www.rottentomatoes.com/m/roma_2018" target="_blank">Roma</a></li>
            <li><a href="https://www.rottentomatoes.com/m/calibre" target="_blank">Calibre</a></li>
            <li><a href="https://www.rottentomatoes.com/m/glass_onion_a_knives_out_mystery" target="_blank">Glass
                    Onion</a></li>
            <li><a href="https://www.rottentomatoes.com/m/roald_dahls_matilda_the_musical">Roald Dahl's
                    <small>Matilda</small> the Musical</a></li>
            <li><a href="https://www.rottentomatoes.com/m/all_quiet_on_the_western_front_2022">All <small>Quiet</small>
                    on the Western Front</a></li>
            <li><a href="https://www.rottentomatoes.com/m/the_sea_beast">The <small>Sea</small> Beast</a></li>

        </ul>


    </article>
    <article class="form">
        <form method="post" action="scripts/subscribe.pl" name="myForm" onsubmit="return validateFilmChoiceForm()">
            <p>
                <input type="radio" checked name="RadioFilm" value="ET" />ET
                <input type="radio" name="RadioFilm" value="Jaws" />Jaws
                <input type="radio" name="RadioFilm" value="LOTR" />LOTR<br />
                <input type="checkbox" name="CheckUHD" value="Yes" />4K
                <input type="checkbox" name="CheckHD" value="Yes" />HD<br />
                Film name: <Input type="text" name="filmname" id="filmname" />
                Director: <Input type="text" name="filmdirector" id="filmdirector" />
            </p>
            <p>That's all folks!</p>
        </form>


    </article>
</body>

</html>