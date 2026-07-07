document.addEventListener("DOMContentLoaded", () => {

    const crewMembers = [
        {
            name:"Abdul Mujeeb Khan Afridi",
            role:"Father",
            phone:"+92 333 2169415",
            image:"./images/temp-1/mujeeb.jpeg"
        },
        {
            name:"Arsalan Khan Afridi",
            role:"Brother",
            phone:"+92 315 2820714",
            image:"./images/temp-1/arsalan.png"
        },
        {
            name:"Haris Khan",
            role:"Brother in law",
            phone:"+92 348 4681097",
            image:"./images/temp-1/haris.jpeg"
        }
    ];

    const track = document.querySelector(".crew-track");
    const leftBtn = document.querySelector(".crew-left");
    const rightBtn = document.querySelector(".crew-right");
    const carousel = document.querySelector(".crew-carousel");

    /* Dynamic cards create */

    track.innerHTML = crewMembers.map((member,i)=>`

        <div class="crew-card" data-index="${i}">

            <div class="bg-[#E8EEF7] rounded-[20px] sm:rounded-[30px] crew-card-inner h-full border border-[#C7D4E5]">

                <div class="rounded-full crew-avatar overflow-hidden mx-auto border-[5px] border-[#1E3F73]">

                    <img
                        src="${member.image}"
                        class="w-full h-full object-cover"
                    >

                </div>

                <div class="crew-info text-center">

                    <h3 class="crew-name text-[#59614E] text-xl sm:text-2xl lg:text-3xl Cormorant font-bold">
                        ${member.name}
                    </h3>

                    <p class="crew-role text-[#2F5EA8] mt-2">
                        ${member.role}
                    </p>

                    <a
                        href="tel:${member.phone.replace(/\s/g,'')}"
                        class="crew-phone inline-flex mt-4 sm:mt-5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#1E3F73] text-white gap-2 items-center text-sm sm:text-base"
                    >

                        <i class="fa-solid fa-phone"></i>

                        ${member.phone}

                    </a>

                </div>

            </div>

        </div>

    `).join("");


    const crewCards = document.querySelectorAll(".crew-card");

    let crewIndex = 0;
    let animating = false;

    function updateCrewCarousel(index){

        if(animating) return;

        animating = true;

        crewIndex =
        (index + crewCards.length)
        %
        crewCards.length;


        crewCards.forEach((card,i)=>{

            card.classList.remove(
                "center",
                "left-1",
                "left-2",
                "right-1",
                "right-2",
                "hidden"
            );

            let offset =
            (i - crewIndex + crewCards.length)
            %
            crewCards.length;


            if(offset===0){

                card.classList.add("center");

            }
            else if(offset===1){

                card.classList.add("right-1");

            }
            else if(offset===2){

                card.classList.add("right-2");

            }
            else if(offset===crewCards.length-1){

                card.classList.add("left-1");

            }
            else if(offset===crewCards.length-2){

                card.classList.add("left-2");

            }
            else{

                card.classList.add("hidden");

            }

        });

        setTimeout(()=>{

            animating=false;

        },800);

    }


    /* buttons */

    rightBtn.addEventListener(
        "click",
        ()=>updateCrewCarousel(crewIndex+1)
    );

    leftBtn.addEventListener(
        "click",
        ()=>updateCrewCarousel(crewIndex-1)
    );


    /* click */

    crewCards.forEach((card,i)=>{

        card.addEventListener(
            "click",
            ()=>updateCrewCarousel(i)
        );

    });


    /* keyboard */

    document.addEventListener("keydown",(e)=>{

        if(e.key==="ArrowRight"){
            updateCrewCarousel(crewIndex+1);
        }

        if(e.key==="ArrowLeft"){
            updateCrewCarousel(crewIndex-1);
        }

    });


    /* swipe */

    let touchStartX=0;
    let touchEndX=0;

    carousel.addEventListener("touchstart",(e)=>{

        touchStartX =
        e.changedTouches[0].screenX;

    });

    carousel.addEventListener("touchend",(e)=>{

        touchEndX =
        e.changedTouches[0].screenX;

        let diff =
        touchStartX-touchEndX;

        if(Math.abs(diff)>50){

            if(diff>0){

                updateCrewCarousel(
                    crewIndex+1
                );

            }else{

                updateCrewCarousel(
                    crewIndex-1
                );

            }

        }

    });


    updateCrewCarousel(0);

});