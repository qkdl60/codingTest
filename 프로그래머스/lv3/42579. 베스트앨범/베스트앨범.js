function solution(genres, plays) {
    
    const genre=[...new Set(genres)];
    const genresPlayTime=[];
    const musicTime=new Map();
    for(let a of genre){
        musicTime.set(a, []);
        let time=0;
        genres.forEach((v,i)=>{
            if(v===a){
                time+=plays[i];
                musicTime.set(a, [...musicTime.get(a), {num:i, time:plays[i]}]);
            }
        })
        genresPlayTime.push({genre: a, playTime: time}); 
        musicTime.set(a, [...musicTime.get(a)].sort((a,b)=>b.time-a.time));
    };
    const bestAlbum=[]; 
    genresPlayTime.sort((a,b)=>b.playTime-a.playTime).forEach(g=>{
        let gen=musicTime.get(g.genre);
        if(gen.length===1)bestAlbum.push(gen[0].num);
        else bestAlbum.push(gen[0].num, gen[1].num);
    });
    return bestAlbum

}