package service

type PlayersRegistry struct {}

func(pr *PlayersRegistry) GetSize() int {
	return len(players)
}

func(pr *PlayersRegistry) Add(name string)() {
	players[pr.GetSize()+1] = name
}

func(pr *PlayersRegistry) RemoveAll() () {
	players = make(map[int]string)
}

var (
	players = make(map[int]string)
)