package service

type GameService struct {
}

func(g GameService) RegisterNewUser(name string) (int) {
	playersRegistry.Add(name)
	return playersRegistry.GetSize()
}

func(g GameService) GetRegisterUsersCount() (int) {
	return playersRegistry.GetSize()
}

func(g GameService) RemoveAllRegisteredUsers() () {
	playersRegistry.RemoveAll()
}

var (
	playersRegistry PlayersRegistry
)
