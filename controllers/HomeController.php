<?php

use Psr\Http\Message\ResponseInterface;
use Slim\Psr7\Request;
use Slim\Psr7\Response;

class HomeController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function test( Request $request, Response $response, array $args ): ResponseInterface {
        $response->getBody()->write("Test method");
        return $response;
    }
}