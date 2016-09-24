package controllers

import "github.com/revel/revel"

type Game struct {
	*revel.Controller
}

func (g Game) RegisterNewUser() revel.Result {
	return g.RenderJson("register")
}
