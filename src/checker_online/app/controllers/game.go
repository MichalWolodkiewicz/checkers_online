package controllers

import (
	"github.com/revel/revel"
	"checker_online/app/service"
	"encoding/json"
)

type Game struct {
	*revel.Controller
	service.GameService
}

func getErrorResponseBody(value string) map[string]string {
	var responseBody = make(map[string]string)
	responseBody["message"] = value
	return responseBody
}

func getIdResponseBody(value int) map[string]int {
	var responseBody = make(map[string]int)
	responseBody["id"] = value
	return responseBody
}

func (g Game) RegisterNewUser() revel.Result {
	var requestBody map[string]string
	err := json.NewDecoder(g.Request.Body).Decode(&requestBody)
	if err != nil {
		g.Response.Status = 400
		return g.RenderJson(getErrorResponseBody("Invalid input. Could not parse json."))
	}
	name, nameExists := requestBody["name"];
	if !nameExists {
		g.Response.Status = 400
		return g.RenderJson(getErrorResponseBody("Invalid input. 'name' field is required."))
	}
	defer g.Request.Body.Close()
	return g.RenderJson(getIdResponseBody(g.GameService.RegisterNewUser(name)))
}
