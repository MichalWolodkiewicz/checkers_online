package tests

import (
	"github.com/revel/revel/testing"
	"strings"

)

type GameControllerTest struct {
	testing.TestSuite
}

func (t *GameControllerTest) Before() {
	println("Set up game controller test")
}

func (t *GameControllerTest) TestThatRegisterNewUserReturnsId() {
	requestBody := strings.NewReader("{\"name\":\"john\"}")
	t.Post("/registerNewUser", "application/json", requestBody)
	t.AssertOk()
	t.AssertContentType("application/json; charset=utf-8")
	t.AssertContainsRegex("\"id\": [0-9]+")
}

func (t *GameControllerTest) TestResponseWhenInputIsEmpty() {
	emptyRequestBody := strings.NewReader("")
	t.Post("/registerNewUser", "application/json", emptyRequestBody)
	t.AssertStatus(400)
	t.AssertContentType("application/json; charset=utf-8")
	t.AssertContains("\"message\": \"Invalid input. Could not parse json.")
}

func (t *GameControllerTest) TestResponseWhenInputDoesNotContainNameField() {
	emptyRequestBody := strings.NewReader("{\"anyField\":\"anyValue\"}")
	t.Post("/registerNewUser", "application/json", emptyRequestBody)
	t.AssertStatus(400)
	t.AssertContentType("application/json; charset=utf-8")
	t.AssertContains("\"message\": \"Invalid input. 'name' field is required.")
}

func (t *GameControllerTest) After() {
	println("Tear down controller test")
}
