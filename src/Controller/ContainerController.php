<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

use Docker\API\Client;

class ContainerController extends AbstractController
{
    /** @var Client */
    protected $docker;

    public function __construct(Client $docker)
    {
        $this->docker = $docker;
    }

    /**
     * @Route("/api/container/ls/{project}", name="api-container-list")
     * @param string $project
     * @return JsonResponse
     */
    public function ls(string $project)
    {
        $filter = [
            'label' => [
                "com.docker.compose.project=${project}",
            ],
        ];

        $containers = $this->docker->containerList([
            'filters' => json_encode($filter),
        ]);

        $response = [];
        foreach ($containers as $container) {
            $response []= $container->getNames();
        }

        return $this->json($response);
    }
}
