<main class="container">
	<div class="left">
        <p class="top_p">Lorem ipsum dolor sit.</p>
        <h3 class="motival_h3">Lorem ipsum dolor sit amet.</h3>
        <p class="bottom_p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, quo officiis? Earum, reiciendis. Minus, expedita ad. Esse rerum reprehenderit quas dolorem nostrum?</p>
        <div class="buttons">
            <button class="buy_btn">Ver</button>
            <button class="view_btn">Navegar</button>
        </div>
    </div>
	<div class="right">
        <img src="https://cdn.dribbble.com/users/946315/screenshots/16655347/media/0110c7639864761865c3cbed5966e337.png" alt="">
    </div>
</main>

<style>
	.container {
		width: 100vw;
        min-height: 100vh;
		display: flex;
		justify-content: center;
        align-items: center;
        flex-wrap: wrap;
	}
    .left, .right{
        width: 600px;
        height: 400px;
        box-sizing: border-box;
    }
    .left{
        /* background: coral; */
        display: flex;
        justify-content: center;
        flex-flow: column;
    }
    .right{
        /* background: pink; */
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 1em;
    }
    /* ----------------- */
	.container .top_p {
		width: 100%;
        font-size: 12px;
        text-transform: uppercase;
        color: silver;
	}
	.container .motival_h3 {
		width: 100%;
        font-size: 50px;
        color: white;
	}
	.container .bottom_p {
		width: 100%;
        font-size: 14px;
        /* text-transform: uppercase; */
        color: silver;
	}
    /* ----------------- */
    .left .buttons{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 1em;
    }
    .left button{
        width: 120px;
        height: 40px;
        border: none;
        outline: none;
        border-radius: 1em;
        color: white;
        margin: 0 .5em;
        cursor: pointer;
    }
    .left .buy_btn{
        background: orange;
    }
    .left .view_btn{
        background: transparent;
        border: 1px solid silver;
    }
    /* ----------------- */
    .right img{
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 1em;
    }
</style>
