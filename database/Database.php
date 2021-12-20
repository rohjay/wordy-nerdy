<?php

class Database
{
    protected $conn = false;

    public function __construct( public Array $db_conf ) {
        if( !$this->conn){
            $this->connect();
        }
    }
    public function connect() {
        if( $this->conn ){
            return $this->conn;
        } else {
            try {
                $dsn = 'mysql:host=' . $this->db_conf['host'] . 
                ';dbname=' . $this->db_conf['db_name'] . 
                ';user=' . $this->db_conf['user'] . 
                ';password=' . $this->db_conf['password'];

                $conn = new PDO($dsn);
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_CLASS);
                $conn->setAttribute(PDO::ATTR_CASE, PDO::CASE_NATURAL);
                $this->conn = $conn;
            } catch(PDOException $e){
                echo "Database connection error:" . $e->getMessage();
                exit;
            }
        }
    }

    public function booksLoaded() {
        if( !$this->table_exists('wd_books')){
            echo '<pre>';
            $books = new Bookparser(BASEDIR . '/contents');
        }
    }

    public function table_exists( $table ) {
        try{
            $this->conn->exec('select * from' . $table . 'where id=1');
            return true;
        } catch( PDOException $e ){
            return false;
        }
    }
}