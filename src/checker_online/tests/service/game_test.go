package tests

import "testing"
import "checker_online/app/service"

func TestThatReturnsNextIdOnUserRegister(t *testing.T) {
	var gs = service.GameService{}
	var firstId = gs.RegisterNewUser("player 1")
	var secondsId = gs.RegisterNewUser("player 2")
	if(firstId == secondsId) {
		t.Error("Next player should have different id than previous player.")
	}
}

func TestThatThreePlayersAreRegistered(t *testing.T) {
	var gs = service.GameService{}
	gs.RemoveAllRegisteredUsers()
	gs.RegisterNewUser("a")
	gs.RegisterNewUser("b")
	gs.RegisterNewUser("c")
	if(gs.GetRegisterUsersCount() != 3) {
		t.Error("3 players should be registered.")
	}
}
