const image=document.querySelector("img")
const title=document.getElementById("title")
const artist=document.getElementById("artist")
const music=document.querySelector('audio')
const progressContainer=document.getElementById("progress-container")
const progress=document.getElementById("progress")
const prevBtn=document.getElementById('prev')
const playBtn=document.getElementById('play')
const nextBtn=document.getElementById('next')
const currenttimeEl=document.getElementById("current-time")
const durationEl=document.getElementById("duration")


const songs=[
    {
        name:'jacinto-1',
        displayName:'Electric Chill Machine',
        artist:'Jacinto'
    },
    {
        name:'jacinto-2',
        displayName:'Seven Nation Army (Remix)',
        artist:'Jacinto'
    },
    {
        name:'jacinto-3',
        displayName:'Good Night Disco Queen',
        artist:'Jacinto'
    },
    {
        name:'metric-1',
        displayName:'Front Row(Remix)',
        artist:'Jacinto'
    }

]


let isPlaying=false;

const playSong=()=>{
    isPlaying=true
    playBtn.classList.replace("fa-play","fa-pause")
    playBtn.setAttribute("title","Pause")
    music.play()
}
const pauseSong=()=>{
    isPlaying=false
    playBtn.classList.replace("fa-pause","fa-play")
    playBtn.setAttribute("title","Play")
    music.pause()
}

playBtn.addEventListener('click',()=>(isPlaying?pauseSong():playSong()))

//Update DOM
const loadSong=(song)=>{
    title.textContent=song.displayName
    artist.textContent=song.artist
    music.src=`music/${song.name}.mp3`
    image.src=`img/${song.name}.jpg`

}
let songIndex=0

const nextSong=()=>{
    songIndex>=songs.length-1?songIndex=0:songIndex++
    
    loadSong(songs[songIndex])
    playSong()
}

const prevSong=()=>{
    songIndex<=0?songIndex=songs.length-1:songIndex--
    loadSong(songs[songIndex])
     playSong()
}

loadSong(songs[songIndex]);

const updateProgressBar=(e)=>{
    if(isPlaying){
        const {duration, currentTime}=e.srcElement
        const progressPercent=(currentTime/duration)*100
        progress.style.width=`${progressPercent}%`
        const durationMinutes= Math.floor(duration/60)
        let durationSeconds=Math.floor(duration % 60)
        if(durationSeconds<10){
            durationSeconds=`0${durationSeconds}`
        }
        //Delay switching duration Element to avoid NaN
        durationSeconds?durationEl.textContent=`${durationMinutes}:${durationSeconds}`:true
        
        //Calculate to display current time
        const currentMinutes= Math.floor(currentTime/60)
        let currentSeconds=Math.floor(currentTime% 60)
        if(currentSeconds<10){
            currentSeconds=`0${currentSeconds}`
        }
        //Delay switching current Element to avoid NaN
        currentSeconds?currenttimeEl.textContent=`${currentMinutes}:${currentSeconds}`:true
        
       
    }
}

//Set Progress Bar
//When i write it with arrow function it doesn't work????
function setProgressBar(e){
    
    const width=this.clientWidth
    const clickX=e.offsetX
    const {duration}=music
    music.currentTime=(clickX/width)*duration
}

prevBtn.addEventListener('click',prevSong)
nextBtn.addEventListener('click',nextSong)
music.addEventListener('ended',nextSong)
music.addEventListener('timeupdate',updateProgressBar)
progressContainer.addEventListener('click',setProgressBar)

